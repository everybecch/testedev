<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User; 
class ConsultarRotaTest extends TestCase
{
    use RefreshDatabase; 

    /**
     * Testa a rota de consulta.
     *
     * @return void
     */
    public function testConsultarRota()
{
    $user = User::factory()->create();

    $response = $this->actingAs($user)
                     ->post('/consultar');

    $response->assertStatus(200);
    
}

}
